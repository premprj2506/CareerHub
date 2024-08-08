import ImageLogo from "../assets/logo.jpeg";

export default function Logo() {
  return (
    <img
      src={ImageLogo}
      alt="this is Logo"
      style={{ borderRadius: "5px", width: "4rem", marginLeft: "1rem" }}
    />
  );
}
