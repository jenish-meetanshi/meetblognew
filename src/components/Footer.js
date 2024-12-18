// src/components/Footer.js
import React from "react";
import { Link } from "gatsby";
import { withPrefix } from "gatsby";

const Footer = () => {
  return (
   <>
   <footer className="site-footer">
      <div className="container mb-5">
      <div className="row justify-content-between">

          <div className="col-auto">

              <div className="footer-logo">
                <a src="/">
                  
                </a>
                <Link to="/">
                {/* Use the static logo image URL here */}
                <img
                  src={withPrefix("/images/footer-logo.png")}
                  alt="Site Logo"
                  style={{ width: "180px", height: "auto", marginBottom: "0" }}
                />
              </Link>
              </div>
          
              <div className="footer-address">
                <div className="d-flex align-items-start">
                  <img className="address-icon" src={withPrefix("/images/location-icon1.svg")} alt="Location Icon" height="25" width="24" />
                  <div>
                    <p className="footer-address-title">Bhavnagar<sup>HQ</sup></p>
                    <p className="footer-address-text">305, Victoria Prime, Near Water Tank, Kaliyabid, Bhavnagar, Gujarat, India - 364002</p>
                  </div>
                </div>
              </div>
          
              <div className="footer-address">
                <div className="d-flex align-items-start">
                  <img className="address-icon" src={withPrefix("/images/location-icon1.svg")} alt="Location Icon" height="25" width="24" />
                  <div>
                    <p className="footer-address-title">USA Representative Office</p>
                    <p className="footer-address-text">5564 Newpark Mall Rd, Newark, CA 94560, USA</p>
                  </div>
                </div>
              </div>
           
              <div className="footer-phone">
                <div className="d-flex align-items-start">
                  <img className="address-icon" src={withPrefix("/images/phoneicon.svg")} alt="Phone Icon" height="25" width="24" />
                  <div>
                    <a className="footer-phone" src="tel:+917202997997">+91 7202 997997</a>
                  </div>
                </div>
              </div>
           
          </div>

          <div className="col-auto">
            <div className="footer-col-wrapper">
              <p className="footer-menu-title">Quick Links</p>
              <ul className="footer-menu">
                <li><a src="#">Career</a></li>
                <li><a src="#">Free Magento Extensions</a></li>
                <li><a src="#">WooCommerce Plugins</a></li>
                <li><a src="#">Sitemap</a></li>
              </ul>
            </div>
          </div>

          <div className="col-auto">
            <div className="footer-col-wrapper">
              <p className="footer-menu-title">Customer Service</p>
              <ul className="footer-menu">
                <li><a src="#">About Us</a></li>
                <li><a src="#">Contact</a></li>
                <li><a src="#">Blog</a></li>
              </ul>
            </div>
          </div>

          {/* Client's Love Section */}
          <div className="col-auto">
            <div className="footer-col-wrapper">
              <p className="footer-menu-title">Client's Love</p>
              <div className="social-media">
            <ul>
                                    <li>
                        <a target="_blank" href="https://www.facebook.com/MeetanshiInc/" title="Facebook"><i className="fab fa-classic fa-brands fa-facebook-f"></i></a>
                    </li>
                                    <li>
                        <a target="_blank" href="https://x.com/MeetanshiInc" title="Twitter"><i className="fab fa-classic fa-brands fa-x-twitter"></i></a>
                    </li>
                                    <li>
                        <a target="_blank" href="https://www.linkedin.com/company/meetanshi/" title="LinkedIn"><i className="fab fa-classic fa-brands fa-linkedin-in"></i></a>
                    </li>
                                    <li>
                        <a target="_blank" href="https://www.youtube.com/channel/UCYsTAn7JerbeZK-KpGFuJWw" title="YouTube"><i className="fab fa-classic fa-brands fa-youtube"></i></a>
                    </li>
                                    <li>
                        <a target="_blank" href="https://github.com/MeetanshiInc" title="GitHub"><i className="fab fa-classic fa-brands fa-github"></i></a>
                    </li>
                            </ul>
        </div>

        <div class="net-zero-website">
                <Link to="https://tree-nation.com/profile/impact/meetanshi#co2">
									<img 
                   
                   src="https://meetanshi.com/blog/wp-content/uploads/2024/07/net-zero.png" // Replace with the actual path to your static logo
                   alt="Site Logo"
                   />
								 </Link>
							</div>
          </div>
        </div>

      </div>
      </div>
      <div className="footer-copy">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                  <div className="footer-copy-text">
                    <p>Copyright © 2017-2024 by Meetanshi Technologies LLP. All Rights Reserved.</p>
                  </div>
              </div>
              <div className="col-md-6 text-end">
                <ul className="footer-copy-links">
                  <li>
                    <a src="https://meetanshi.com/refund-policy" target="_blank">Refund Policy</a>
                  </li>
                  <li>
                    <a src="https://meetanshi.com/end-user-license-agreement" target="_blank">EULA</a>
                  </li>
                  <li>
                    <a src="https://meetanshi.com/terms-conditions" target="_blank">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a src="https://meetanshi.com/privacy-policy" target="_blank">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

    </footer>
   </>
  );
};

export default Footer;
