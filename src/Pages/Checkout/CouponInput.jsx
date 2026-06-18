import { useState } from "react";
import API from "../../services/api";
import "./CouponInput.css";

function CouponInput({ orderTotal, onCouponApplied, onCouponRemoved, appliedCoupon }) {
    const [code, setCode]       = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState("");
    const [success, setSuccess] = useState("");

    const userInfo = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null;

    const handleApply = async () => {
        const trimmed = code.trim().toUpperCase();
        if (!trimmed) { setError("Please enter a coupon code."); return; }
        setError(""); setSuccess(""); setLoading(true);
        try {
            const res = await API.post(
                "/coupons/apply",
                { code: trimmed, orderTotal },
                { headers: { Authorization: `Bearer ${userInfo?.token}` } }
            );
            setSuccess(res.data.message);
            setCode("");
            onCouponApplied(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid coupon code.");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = () => {
        setCode(""); setError(""); setSuccess("");
        onCouponRemoved();
    };

    if (appliedCoupon) {
        return (
            <div className="coupon-applied-strip">
                <div className="coupon-applied-left">
                    <span className="coupon-tag-icon">🎟️</span>
                    <div>
                        <span className="coupon-applied-code">{appliedCoupon.code}</span>
                        <span className="coupon-applied-desc">
                            {appliedCoupon.type === "percentage"
                                ? `${appliedCoupon.value}% off applied`
                                : `$${appliedCoupon.value.toFixed(2)} off applied`}
                        </span>
                    </div>
                </div>
                <div className="coupon-applied-right">
                    <span className="coupon-savings">−${appliedCoupon.discountAmount.toFixed(2)}</span>
                    <button className="coupon-remove-btn" onClick={handleRemove} title="Remove coupon">✕</button>
                </div>
            </div>
        );
    }

    return (
        <div className="coupon-input-wrapper">
            <div className="coupon-input-row">
                <div className="coupon-field">
                    <span className="coupon-prefix-icon">🎟️</span>
                    <input
                        id="coupon-code-input"
                        type="text"
                        placeholder="Enter coupon code"
                        value={code}
                        onChange={e => { setCode(e.target.value.toUpperCase()); setError(""); setSuccess(""); }}
                        onKeyDown={e => e.key === "Enter" && handleApply()}
                        maxLength={30}
                        autoComplete="off"
                        spellCheck={false}
                    />
                </div>
                <button
                    className="coupon-apply-btn"
                    onClick={handleApply}
                    disabled={loading || !code.trim()}
                    id="apply-coupon-btn"
                >
                    {loading ? <span className="coupon-spinner" /> : "Apply"}
                </button>
            </div>
            {error   && <p className="coupon-feedback coupon-error">⚠ {error}</p>}
            {success && <p className="coupon-feedback coupon-success">✓ {success}</p>}
        </div>
    );
}

export default CouponInput;
