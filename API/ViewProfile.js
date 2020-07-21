import CustomRequest from './CustomRequest';
export default async (Token) => {
    return await CustomRequest('Profile/ViewSelfProfile', 'GET', true, Token)
}