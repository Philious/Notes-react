
export interface IHttpClient {
  get<T>(url: string): Promise<HttpResponse<T>>;
  put<T>(url: string, body: any): Promise<HttpResponse<T>>;
  post<T>(url: string, body: any): Promise<HttpResponse<T>>;
  delete(url: string): Promise<HttpResponse<void>>;
}

export class HttpClient implements IHttpClient {
  constructor(protected baseUrl: string, protected cookies?: string) { }
  private tries = 0;
  private async sendRequest<T>(url: string, method: "GET" | "PUT" | "POST" | "DELETE", body?: any) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(url, {
        headers,
        method,
        body: JSON.stringify(body),
      });

      if (response.ok) {
        this.tries = 0;
        const isJson = response.headers.get("content-type")?.includes("application/json");

        return new HttpResponse<T>(
          response.ok,
          response.status,
          isJson ? ((await response.json()) as T) : undefined
        );
      } else {
        this.tries += 1;
        if (this.tries > 5) throw Error();
        this.sendRequest(url, method, body);
        return new HttpResponse<T>(response.ok, response.status, undefined);
      }
    } catch (err) {
      console.error(err);
      return new HttpResponse<T>(false, 0, undefined);
    }
  }

  public async get<T>(url: string) {
    // console.log("GET " + `${this.baseUrl}/${url}`);
    return this.sendRequest<T>(`${this.baseUrl}/${url}`, "GET");
  }

  public async put<T>(url: string, body: any) {
    // console.log("PUT " + `${this.baseUrl}/${url}`);
    return this.sendRequest<T>(`${this.baseUrl}/${url}`, "PUT", body);
  }

  public async post<T>(url: string, body: any) {
    // console.log("POST " + `${this.baseUrl}/${url}`);
    return this.sendRequest<T>(`${this.baseUrl}/${url}`, "POST", body);
  }

  public async delete(url: string) {
    // console.log("DELETE " + `${this.baseUrl}/${url}`);
    return this.sendRequest<void>(`${this.baseUrl}/${url}`, "DELETE");
  }
}

export class HttpResponse<T> {
  constructor(public ok: boolean, public statusCode: number, public body?: T) { }
}
