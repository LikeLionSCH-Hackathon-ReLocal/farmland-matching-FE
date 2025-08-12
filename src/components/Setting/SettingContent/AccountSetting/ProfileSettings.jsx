// ProfileSettings.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./ProfileSetting.css";

function ProfileSettings({ user, onChange }) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    sex: "",
    callNumber: "",
    mail: "",
    address: "",
  });

  // 상위에서 받은 user → 폼에 주입
  useEffect(() => {
    if (user) {
      const mapped = {
        name: user.name || "",
        age: user.age || "",
        sex: user.sex || "",
        callNumber: user.callNumber || "",
        mail: user.mail || "",
        address: user.address || "",
      };
      setForm(mapped);
    }
  }, [user]);

  const canSave = useMemo(() => {
    return form.name.trim() && form.age.trim() && form.callNumber.trim();
  }, [form]);

  const onField = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSave = () => {
    if (!canSave) return;
    // 상위 youngUser 업데이트
    const updated = { ...user, ...form };
    onChange?.(updated);
    setEditMode(false);
    alert("프로필이 저장되었습니다.");
    console.log("✅ 저장할 데이터:", updated);
  };

  return (
    <div className="ProfileSettings-container">
      <div className="ProfileSettings-top-section">
        <div className="ProfileSettings-left-top-section">
          <div className="ProfileSettings-input-row half-width">
            <label>이름</label>
            <input
              value={form.name}
              onChange={onField("name")}
              disabled={!editMode}
            />
          </div>
          <div className="ProfileSettings-input-row half-width">
            <label>나이</label>
            <input
              value={form.age}
              onChange={onField("age")}
              disabled={!editMode}
            />
          </div>
          <div className="ProfileSettings-input-row half-width">
            <label>성별</label>
            <input
              value={form.sex}
              onChange={onField("sex")}
              disabled={!editMode}
            />
          </div>
        </div>

        <div className="ProfileSettings-profile-photo">
          <img
            src={user?.profileImage || "/images/default_profile.png"}
            alt="프로필 사진"
            className="ProfileSettings-photo-img"
          />
        </div>
      </div>

      <div className="ProfileSettings-left-section">
        <div className="ProfileSettings-input-row">
          <label>전화번호</label>
          <input
            className="ProfileSettings-num"
            value={form.callNumber}
            onChange={onField("callNumber")}
            disabled={!editMode}
          />
          <span className="ProfileSettings-error-text">
            전화번호 인증 완료.
          </span>
        </div>

        <div className="ProfileSettings-input-row">
          <label>메일</label>
          <input
            className="ProfileSettings-num"
            value={form.mail}
            onChange={onField("mail")}
            disabled={!editMode}
          />
          <span className="ProfileSettings-error-text">
            메일 인증 완료.
          </span>
        </div>

        <div className="ProfileSettings-input-row">
          <label>주소</label>
          <input
            value={form.address}
            onChange={onField("address")}
            disabled={!editMode}
          />
        </div>
      </div>

      {!editMode ? (
        <button
          className="ProfileSettings-submit-button"
          onClick={() => setEditMode(true)}
        >
          수정하기
        </button>
      ) : (
        <div style={{ display: "flex", gap: "0.6rem" }}>
          <button
            className="ProfileSettings-submit-button"
            disabled={!canSave}
            onClick={handleSave}
          >
            저장
          </button>
          <button
            className="ProfileSettings-cancel-button"
            onClick={() => {
              setForm({
                name: user?.name || "",
                age: user?.age || "",
                sex: user?.sex || "",
                callNumber: user?.callNumber || "",
                mail: user?.mail || "",
                address: user?.address || "",
              });
              setEditMode(false);
            }}
          >
            취소
          </button>
        </div>
      )}
    </div>
  );
}
export default ProfileSettings;
