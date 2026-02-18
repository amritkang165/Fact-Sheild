import logo from "../assets/logo.png";

function Header() {
  return (
    <div className="logo-container">
      <img src={logo} alt="FactShield Logo" className="logo" />
    </div>
  );
}

export default Header;
