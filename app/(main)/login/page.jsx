"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from './login.module.css';

import ForgotPasswordModal from "@/components/Forgotpassword";
import RvBreadcrumbs from "@/components/landing/page-breadcrumbs/rvbreadcrumbs";
import SectionHeading from "@/components/landing/section-heading/sectionheading";
import { FaRegEye , FaRegEyeSlash  } from "react-icons/fa";
const LoginPage = () => {
  const router = useRouter();

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [selectedRole, setSelectedRole] = useState("CLIENT");
  const [provider, setProvider] = useState({
    username: "",
    password: "",
    loginFor: "CLIENT",
    siteUrl: "",
    callbackUrl: "",
  });

  // Fetch site data on mount
  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const res = await axios.get("/api/admin/site-settings");
        if (res.status === 200 && res.data[0]) {
          setProvider((prev) => ({
            ...prev,
            siteUrl: res?.data[0]?.siteurl,
            callbackUrl: res?.data[0]?.callbackurl,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch site settings", error);
      }
    };

    fetchSiteData();
  }, []);

  // Update loginFor when role changes
  useEffect(() => {
    setProvider((prev) => ({
      ...prev,
      loginFor: selectedRole === "ADMIN" ? "ARN" : selectedRole,
    }));
  }, [selectedRole]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("https://redvisionweb.com/api/login/arn-login", provider);
      if (res?.data?.status === true) {
        router.push(res?.data?.url);
      } else {
        setError(res?.data?.msg);
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const roles = ["CLIENT", "EMPLOYEE", "ADMIN", "BROKER", "BRANCH"];

  return (
    <div>
      <div className="">
        <RvBreadcrumbs
          maintitle="Login"
        // lastTitle={post?.posttitle}

        />
      </div>

      <div className={`${styles.loginsection} section`}>
        <div className="container">
          {/* Left Section */}
          <div className={`${styles.loginCard}`}>
            <div className={`${styles.loginRow} rvRow`}>
              <div className={`${styles.loginCol} rvCol`}>
                <div className={`${styles.loginleft}`}>
                  <div className={`${styles.loginhadding}`}>
                    <SectionHeading
                      maintitle='AMFI Registered Mutual Fund Distributor'
                      title='Every Investment'
                      secondPart='A Step Closer to Your  Dreams '
                      paragraph=' Together, let&apos;s create the life you deserve.'
                    />
                  </div>
                  <Image src="/images/login-2.webp" alt='About' className="" width={1020} height={1020} />
                </div>
              </div>
              {/* Right Section */}
              <div className={`${styles.loginCol} rvCol`}>
                <div className={styles.loginrightCard}>
                <Image src="/images/login.webp" alt='Login Background' className="" width={120} height={120} />
                <div className={styles.loginrightCardbody}>
                  <h5 className="">Login to your account</h5>
                  <form onSubmit={handleSubmit} className="">
                    <div className="">
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className=""
                    >
                      {roles.map((role, index) => (
                        <option value={role} key={index}>{role}</option>
                      ))}
                    </select>
                    </div>
                    <div className="">
                    <input
                      type="text"
                      placeholder="Username"
                      value={provider.username}
                      onChange={(e) => setProvider({ ...provider, username: e.target.value })}
                      className=""
                    />
                    </div>
                    <div className={styles.forgotPasswordeye}>
                    <input
                      type={passwordShown ? 'text' : 'password'}
                      placeholder="Password"
                      value={provider.password}
                      onChange={(e) => setProvider({ ...provider, password: e.target.value })}
                      className=""
                    />
                   <span onClick={() => setPasswordShown(!passwordShown)}>{passwordShown ? <FaRegEyeSlash /> : <FaRegEye />}</span>
                    </div>
                    <div className={styles.ForgotPasswordM}>
                      <button type="button" onClick={() => setShowForgotModal(true)} >
                        Forgot your password?
                      </button>
                    </div>
                    {error && <div className="">{error}</div>}
                    <button
                      type="submit"
                      className={`${styles.btnlogin} btn btn-primary`}
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </form>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {console.log(selectedRole)} */}
        {/* Forgot Password Modal */}
        <ForgotPasswordModal
          isOpen={showForgotModal}
          onClose={() => setShowForgotModal(false)}
          logintype={selectedRole === "ADMIN" ? "ARN" : selectedRole}
        />
      </div>
    </div>
  );
};

export default LoginPage;
