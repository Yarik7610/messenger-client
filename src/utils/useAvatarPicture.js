export const useAvatarPicture = (avatarPicture) =>
  `http://localhost:3001/api/images/${avatarPicture ? avatarPicture : 'default-avatar-picture.png'}`
