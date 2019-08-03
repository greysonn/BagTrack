import * as request from 'request-promise';

/**
 * Goat account manager
 */
export class Goat {
  private authToken: string;

  public async logIn(username: string, password: string): Promise<string> {
    // tslint:disable: await-promise
    try {
      const res: request.RequestPromise = await request({
        method: 'POST',
        url: 'https://www.goat.com/api/v1/users/sign_in',
        headers: {
          'x-emb-id': '7DD5C006FCCC405BB25581839326EE12',
          'User-Agent': 'GOAT/2.17.0 (iPhone; iOS 11.3; Scale/3.00) Locale/en',
          'content-type': 'application/x-www-form-urlencoded'
        },
        formData: {
          'user[login]': username,
          'user[password]': password
        },
        resolveWithFullResponse: true
      });

      return JSON.parse(res.body.toString()).authToken;
    } catch (e) {
      return '';
    }
  }
}
