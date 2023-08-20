import { CSSProperties, useContext, useEffect, useState } from "react";
// import { Buffer } from 'buffer';

import styles from "styles/components/user/photoProfile.module.css";
import { UserContext } from "provider/userProvider";
import { profileEditPhotoService } from "services/user/profile";

interface CustomCSSProperties extends CSSProperties {
  "--my-image": string;
}

const PhotoProfile = () => {
  const { user } = useContext(UserContext);
  const [photo, setPhoto] = useState<string | any>(null);

  const changeProfile = (e: any) => {
    const file = e.target.files?.[0] as File;
    const fileUrl = URL.createObjectURL(file);
    setPhoto(fileUrl);

    // TODO: guardar como blob
  };

  useEffect(() => {
    if (user.image) {
      setPhoto(user.image);
    }
  }, [user.image]);

  return (
    <div
      className={`${styles.layout}`}
      style={
        {
          "--my-image": `url(${photo})`,
        } as CustomCSSProperties
      }
    >
      <div className={`${styles.image}`}>
        <label htmlFor="profileImageInput">
          {!photo && !user.image && <div>{user.name[0]}</div>}
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            onChange={(e) => changeProfile(e)}
            style={{ display: "none" }}
          />
        </label>
      </div>
    </div>
  );
};

export default PhotoProfile;
