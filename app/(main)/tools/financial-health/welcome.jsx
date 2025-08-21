"use client";
import React from "react";
import styles from "./health.module.css";

const WelcomePage = ({ onStatus }) => {
    return (
        <div>
            <div className={`${styles.rvcards}`}> 
            <h2 className="text-4xl md:text-6xl font-extrabold text-black">
                Check Your <span className="text-[var(--rv-primary)]">Financial Health</span>
            </h2>

            <p className="text-black mt-6  leading-relaxed text-lg text-center">
                Your financial health is more than just the balance in your bank account —
                it’s a reflection of how prepared you are for life’s opportunities and challenges.
                A strong financial foundation allows you to manage daily expenses comfortably,
                save for the future, handle unexpected emergencies, and work towards long-term
                goals like owning a home, funding education, or retiring stress-free.
                <br /><br />
                By assessing your financial health, you gain a clear picture of where you stand
                today — and what steps you can take to improve your tomorrow. Whether it’s
                reducing debt, boosting savings, optimizing investments, or simply making
                smarter money choices, this assessment helps you take control of your finances
                and build lasting security.
            </p>
            <p className="text-center">
            <button className="btn btn-primary m-auto  mt-5" onClick={() => onStatus(true)}>
                Start Assessment
            </button>
            </p>
        </div>
        </div>
    );
};

export default WelcomePage;
