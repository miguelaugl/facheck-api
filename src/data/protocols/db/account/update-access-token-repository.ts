export interface UpdateAccessTokenRepository {
  updateAccessToken: (accessToken: string) => Promise<void>
}
