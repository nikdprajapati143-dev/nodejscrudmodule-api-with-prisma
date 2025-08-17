export const UserResource = (user) => {
    const baseUrl = process.env.APP_URL || 'http://localhost:3000';


    return {
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage ? `${baseUrl}${user.profileImage}` : null,
        created_at: user.created_at,
    };
};
