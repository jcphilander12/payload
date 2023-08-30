/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'node-fetch';
import qs from 'qs';

import type { Config } from '../../src/config/types.js';
import type { PaginatedDocs } from '../../src/database/types.js';
import type { Where } from '../../src/types/index.js';

import { devUser } from '../credentials.js';

const fetchToUse = 'default' in fetch ? fetch.default : fetch;

type Args = {
  defaultSlug: string;
  serverURL: string;
};

type LoginArgs = {
  collection: string;
  email: string;
  password: string;
};

type LogoutArgs = {
  collection: string;
};

type CreateArgs<T = any> = {
  auth?: boolean;
  data: T;
  file?: boolean;
  slug?: string;
};

type FindArgs = {
  auth?: boolean;
  depth?: number
  limit?: number
  page?: number
  query?: Where;
  slug?: string;
};

type FindByIDArgs = {
  auth?: boolean;
  id: number | string;
  options?: {
    depth?: number
    limit?: number
    page?: number
  },
  query?: Where;
  slug?: string;
};

type UpdateArgs<T = any> = {
  auth?: boolean;
  data: Partial<T>;
  id: string;
  query?: any;
  slug?: string;
};

type UpdateManyArgs<T = any> = {
  auth?: boolean;
  data: Partial<T>;
  slug?: string;
  where: any;
};

type DeleteArgs = {
  auth?: boolean;
  id: string;
  slug?: string;
};

type DeleteManyArgs = {
  auth?: boolean;
  slug?: string;
  where: any;
};

type FindGlobalArgs<T = any> = {
  auth?: boolean;
  slug?: string;
}

type UpdateGlobalArgs<T = any> = {
  auth?: boolean;
  data: Partial<T>;
  slug?: string;
}

type DocResponse<T> = {
  doc: T;
  errors?: { data: any, message: string, name: string }[]
  status: number;
};

type DocsResponse<T> = {
  docs: T[];
  errors?: { data: any, id: number | string, message: string, name: string }[]
  status: number;
};

const headers = {
  'Content-Type': 'application/json',
  Authorization: '',
};

type QueryResponse<T> = {
  result: PaginatedDocs<T>;
  status: number;
};

export class RESTClient {
  private readonly config: Config;

  private defaultSlug: string;

  private token: string;

  serverURL: string;

  constructor(config: Config, args: Args) {
    this.config = config;
    this.serverURL = args.serverURL;
    this.defaultSlug = args.defaultSlug;
  }

  async create<T = any>(args: CreateArgs): Promise<DocResponse<T>> {
    const options = {
      body: args.file ? args.data : JSON.stringify(args.data),
      headers: {
        ...(args.file ? [] : headers),
        Authorization: '',
      },
      method: 'POST',
    };

    if (args?.auth !== false && this.token) {
      options.headers.Authorization = `JWT ${this.token}`;
    }

    const slug = args.slug || this.defaultSlug;
    const response = await fetchToUse(`${this.serverURL}/api/${slug}`, options);
    const { status } = response;
    const { doc } = await response.json();
    return { status, doc };
  }

  async delete<T = any>(id: string, args?: DeleteArgs): Promise<DocResponse<T>> {
    const options = {
      headers: { ...headers },
      method: 'DELETE',
    };

    if (args?.auth !== false && this.token) {
      options.headers.Authorization = `JWT ${this.token}`;
    }

    const slug = args?.slug || this.defaultSlug;
    const response = await fetchToUse(`${this.serverURL}/api/${slug}/${id}`, options);
    const { status } = response;
    const doc = await response.json();
    return { status, doc };
  }

  async deleteMany<T = any>(args: DeleteManyArgs): Promise<DocsResponse<T>> {
    const { where } = args;
    const options = {
      headers: { ...headers },
      method: 'DELETE',
    };

    if (args?.auth !== false && this.token) {
      options.headers.Authorization = `JWT ${this.token}`;
    }

    const formattedQs = qs.stringify({
      ...(where ? { where } : {}),
    }, {
      addQueryPrefix: true,
    });

    const slug = args?.slug || this.defaultSlug;
    const response = await fetchToUse(`${this.serverURL}/api/${slug}${formattedQs}`, options);
    const { status } = response;
    const json = await response.json();
    return { status, docs: json.docs, errors: json.errors };
  }

  async endpoint<T = any>(path: string, method = 'GET', params: any = undefined): Promise<{ data: T, status: number }> {
    const options = {
      body: JSON.stringify(params),
      headers: { ...headers },
      method,
    };

    const response = await fetchToUse(`${this.serverURL}${path}`, options);
    const { status } = response;
    const data = await response.json();
    return { status, data };
  }

  async endpointWithAuth<T = any>(path: string, method = 'GET', params: any = undefined): Promise<{ data: T, status: number }> {
    const options = {
      body: JSON.stringify(params),
      headers: { ...headers },
      method,
    };

    if (this.token) {
      options.headers.Authorization = `JWT ${this.token}`;
    }

    const response = await fetchToUse(`${this.serverURL}${path}`, options);
    const { status } = response;
    const data = await response.json();
    return { status, data };
  }

  async find<T = any>(args?: FindArgs): Promise<QueryResponse<T>> {
    const options = {
      headers: { ...headers },
    };

    if (args?.auth !== false && this.token) {
      options.headers.Authorization = `JWT ${this.token}`;
    }

    const whereQuery = qs.stringify({
      ...(args?.query ? { where: args.query } : {}),
      limit: args?.limit,
      page: args?.page,
    }, {
      addQueryPrefix: true,
    });

    const slug = args?.slug || this.defaultSlug;
    const response = await fetchToUse(`${this.serverURL}/api/${slug}${whereQuery}`, options);
    const { status } = response;
    const result = await response.json();
    if (result.errors) throw new Error(result.errors[0].message);
    return { status, result };
  }

  async findByID<T = any>(args: FindByIDArgs): Promise<DocResponse<T>> {
    const options = {
      headers: { ...headers },
    };

    if (args?.auth !== false && this.token) {
      options.headers.Authorization = `JWT ${this.token}`;
    }

    const slug = args?.slug || this.defaultSlug;
    const formattedOpts = qs.stringify(args?.options || {}, { addQueryPrefix: true });
    const response = await fetchToUse(`${this.serverURL}/api/${slug}/${args.id}${formattedOpts}`, options);
    const { status } = response;
    const doc = await response.json();
    return { status, doc };
  }

  async findGlobal<T = any>(args?: FindGlobalArgs): Promise<DocResponse<T>> {
    const options = {
      headers: { ...headers },
    };

    if (args?.auth !== false && this.token) {
      options.headers.Authorization = `JWT ${this.token}`;
    }

    const slug = args?.slug || this.defaultSlug;
    const response = await fetchToUse(`${this.serverURL}/api/globals/${slug}`, options);
    const { status } = response;
    const doc = await response.json();
    return { status, doc };
  }

  async login(incomingArgs?: LoginArgs): Promise<string> {
    const args = incomingArgs ?? {
      email: devUser.email,
      password: devUser.password,
      collection: 'users',
    };

    const response = await fetchToUse(`${this.serverURL}/api/${args.collection}/login`, {
      body: JSON.stringify({
        email: args.email,
        password: args.password,
      }),
      headers,
      method: 'POST',
    });

    let { token } = await response.json();

    // If the token is not in the response body, then we can extract it from the cookies
    if (!token) {
      const setCookie = response.headers.get('Set-Cookie');
      const tokenMatchResult = setCookie?.match(/payload-token=(?<token>.+?);/);
      token = tokenMatchResult?.groups?.token;
    }

    this.token = token;

    return token;
  }

  async logout(incomingArgs?: LogoutArgs): Promise<void> {
    const args = incomingArgs ?? {
      collection: 'users',
    };

    await fetchToUse(`${this.serverURL}/api/${args.collection}/logout`, {
      headers,
      method: 'POST',
    });

    this.token = '';
  }

  async update<T = any>(args: UpdateArgs<T>): Promise<DocResponse<T>> {
    const { id, query, data } = args;

    const options = {
      body: JSON.stringify(data),
      headers: { ...headers },
      method: 'PATCH',
    };

    if (args?.auth !== false && this.token) {
      options.headers.Authorization = `JWT ${this.token}`;
    }

    const formattedQs = qs.stringify(query);
    const slug = args.slug || this.defaultSlug;
    const response = await fetchToUse(`${this.serverURL}/api/${slug}/${id}${formattedQs}`, options);
    const { status } = response;
    const json = await response.json();
    return { status, doc: json.doc, errors: json.errors };
  }

  async updateGlobal<T = any>(args: UpdateGlobalArgs): Promise<DocResponse<T>> {
    const { data } = args;
    const options = {
      body: JSON.stringify(data),
      headers: { ...headers },
      method: 'POST',
    };

    if (args?.auth !== false && this.token) {
      options.headers.Authorization = `JWT ${this.token}`;
    }

    const slug = args?.slug || this.defaultSlug;
    const response = await fetchToUse(`${this.serverURL}/api/globals/${slug}`, options);
    const { status } = response;
    const { result } = await response.json();
    return { status, doc: result };
  }

  async updateMany<T = any>(args: UpdateManyArgs<T>): Promise<DocsResponse<T>> {
    const { data, where } = args;
    const options = {
      body: JSON.stringify(data),
      headers: { ...headers },
      method: 'PATCH',
    };

    if (args?.auth !== false && this.token) {
      options.headers.Authorization = `JWT ${this.token}`;
    }

    const formattedQs = qs.stringify({
      ...(where ? { where } : {}),
    }, {
      addQueryPrefix: true,
    });

    const slug = args?.slug || this.defaultSlug;
    const response = await fetchToUse(`${this.serverURL}/api/${slug}${formattedQs}`, options);
    const { status } = response;
    const json = await response.json();
    return { status, docs: json.docs, errors: json.errors };
  }
}
