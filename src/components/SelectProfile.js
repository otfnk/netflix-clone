import "./styles/SelectProfile.scss";
import Logo from "../media/netflix-logo.png";
import ProfilePicture from "../media/profile-picture.jpeg";
import { useContext, AuthContext } from "../context";

const SelectProfile = ({ setIsSelected, email }) => {
  const { currentUser } = useContext(AuthContext);
  const emailName = email.split("@").shift();
  return (
    <>
      <nav>
        <img
          src={Logo}
          style={{ transform: "scale(0.6)" }}
          className="nav-logo"
          alt="Netflix Logo"
        />
      </nav>
      <section className="select-profile-section">
        <div className="profiles-wrapper">
          <div className="select-profile-header">
            <h1>Who is watching?</h1>
          </div>
          <div className="profile-buttons">
            <div className="profile-one" onClick={() => setIsSelected(true)}>
              <img
                src={
                  currentUser.photoURL === null
                    ? ProfilePicture
                    : currentUser.photoURL
                }
                alt="Profile Pic"
              />
              <h3>{emailName}</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SelectProfile;
