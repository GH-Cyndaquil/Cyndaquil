import React from 'react';

function Footer() {
  return (
    <div id="footer">
      <div>Created By</div>
      <div id="footer-links">
        <a href="https://github.com/Splix1">
          <img
            className="footer-link-img"
            src="https://avatars.githubusercontent.com/u/86242483?v=4"
          />
        </a>
        <a href="https://github.com/matt-yard">
          <img
            className="footer-link-img"
            src="https://avatars.githubusercontent.com/u/90485595?v=4"
          />
        </a>
        <a href="https://github.com/Bruer26">
          <img
            className="footer-link-img"
            src="https://avatars.githubusercontent.com/u/82614804?v=4"
          />
        </a>
        <a href="https://github.com/DaleLuce">
          <img
            className="footer-link-img"
            src="https://avatars.githubusercontent.com/u/52118076?v=4"
          />
        </a>
      </div>
      <div>Copyright @2022 NYET</div>
    </div>
  );
}

export default Footer;
