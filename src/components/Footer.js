import React from "react";
import { Link } from "gatsby";
import { withPrefix } from "gatsby";

const Footer = () => {
return (
<>
  <footer className="site-footer">
    <div className="container-lg mb-5">
      <div className="row justify-content-between">
        <div className="col-lg-3 col-md-6 md-mb-3">
          <div className="footer-logo">
            <Link to="/">
            {/* Use the static logo image URL here */}
            <img
              className="img-fluid"
              src={withPrefix("/images/footer-logo.png")}
              alt="Site Logo" />
            </Link>
          </div>
          <div className="footer-address">
            <div className="d-flex align-items-start">
              <img className="address-icon img-fluid" src={withPrefix("/images/location-icon1.svg")} alt="Location Icon" height="25" width="24" loading="lazy" />
              <div>
                <p className="footer-address-title">Bhavnagar<sup>HQ</sup></p>
                <p className="footer-address-text">305-307, Victoria Prime, Near Water Tank, Kaliyabid, Bhavnagar, Gujarat, India - 364002</p>
              </div>
            </div>
          </div>
          <div className="footer-phone">
            <div className="d-flex align-items-start">
              <img className="address-icon img-fluid" src={withPrefix("/images/phone-icon.svg")} alt="Phone Icon" height="25" width="24" loading="lazy" />
              <div>
                <a className="footer-phone" href="tel:+917202997997">+91 7202 997997</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 md-mb-3">
          <div className="footer-col-wrapper">
            <p className="footer-menu-title">Quick Links</p>
            <ul className="footer-menu">
              <li><a href="https://meetanshi.com/magento-2-extensions.html">Magento 2 Extensions</a></li>
              <li><a href="https://meetanshi.com/magento-upgrade-service">Magento Upgrade Service</a></li>
              <li><a href="https://meetanshi.com/magento-2-migration-service.html">Magento 1 to Magento 2 Migration Service</a></li>
              <li><a href="https://meetanshi.com/hyva-theme-development-service">Hyvä Theme Development Service</a></li>
              <li><a href="https://meetanshi.com/shopify-apps.html">Shopify Apps</a></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 md-mb-3">
          <div className="footer-col-wrapper">
            <p className="footer-menu-title">Customer Service</p>
            <ul className="footer-menu">
              <li><a href="https://meetanshi.com/about">About Us</a></li>
              <li><a href="https://meetanshi.com/contacts">Contact Us</a></li>
              <li><a href="https://meetanshi.com/docs/">Meetanshi Docs</a></li>
              <li><a href="https://meetanshi.com/blog/">Blog</a></li>
              <li>
                  <a href="https://meetanshi.com/career">Careers</a>
                  <span
                    className="font-Poppinsregular text-custom-dark bg-white"
                    style={{
                      fontSize: "10px",
                      padding: "2px 6px",
                      marginLeft: "5px",
                      borderRadius: "50px",
                      marginBottom: "0.6rem",
                      display: "inline-block",
                      color: "#333",
                    }} >
                  Hiring!
                </span>
              </li>
              <li><a href="https://meetanshi.com/partner-program">Partner Program</a></li>
              <li><a href="https://meetanshi.com/shopify-theme-detector">Shopify Theme Detector</a></li>
            </ul>
          </div>
        </div>
        {/* Client's Love Section */}
        <div className="col-lg-3 col-md-6 md-mb-3">
          <div className="footer-col-wrapper">
            <p className="footer-menu-title">Client's Love</p>
            <div className="social-review">
              <ul>
                <li>
                  <Link to="https://www.facebook.com/MeetanshiInc/reviews/" target="_blank" rel="noopener">
                  <img className="social-review-img img-fluid" src={withPrefix("/images/facebookreview.svg")} alt="facebook review" height="30" width="74" loading="lazy" />
                  </Link>
                </li>
                <li>
                  <Link to="https://www.google.co.in/search?q=meetanshi&oq=meetanshi&aqs=chrome..69i57j69i60l4j35i39.1719j0j7&sourceid=chrome&ie=UTF-#lrd=0x395f5a776c79bb61:0x7745f9c051e81140,1,,," target="_blank" rel="noopener">
                  <img className="social-review-img img-fluid" src={withPrefix("/images/googlereview.svg")} alt="google review" height="30" width="74" loading="lazy" />
                  </Link>
                </li>
                <li>
                  <Link to="https://www.goodfirms.co/company/meetanshi" target="_blank" rel="noopener">
                  <img className="social-review-img img-fluid" src={withPrefix("/images/goodfirmsreview.svg")} alt="goodfirms review" height="30" width="74" loading="lazy" />
                  </Link>
                </li>
                <li>
                  <Link to="https://clutch.co/profile/meetanshi" target="_blank" rel="noopener">
                  <img className="social-review-img img-fluid" src={withPrefix("/images/clutchreview.svg")} alt="clutch review" height="30" width="74" loading="lazy" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="social-media">
              <ul>
                
              </ul>
            </div>
            <div className="net-zero-website">
              <Link to="https://tree-nation.com/profile/impact/meetanshi#co2">
              <img className="net-zero-img img-fluid" src={withPrefix("/images/net-zero-footer.svg")} alt="Net Zero Image" height="33" width="101" loading="lazy" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-copy">
      <div className="container-lg">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="footer-copy-text">
              <p>Copyright © 2017-2025 by Meetanshi Technologies LLP. All Rights Reserved.</p>
            </div>
          </div>
          <div className="col-md-6 text-end">
            <ul className="footer-copy-links">
              <li>
                <a href="https://meetanshi.com/refund-policy" target="_blank">Refund Policy</a>
              </li>
              <li>
                <a href="https://meetanshi.com/end-user-license-agreement" target="_blank">EULA</a>
              </li>
              <li>
                <a href="https://meetanshi.com/terms-conditions" target="_blank">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="https://meetanshi.com/privacy-policy" target="_blank">Privacy Policy</a>
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
