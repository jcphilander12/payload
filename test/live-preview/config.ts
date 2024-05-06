import { buildConfigWithDefaults } from '../buildConfigWithDefaults.js'
import Categories from './collections/Categories.js'
import { Media } from './collections/Media.js'
import { Pages } from './collections/Pages.js'
import { Posts, postsSlug } from './collections/Posts.js'
import { PostsSSR, ssrPostsSlug } from './collections/PostsSSR.js'
import { Tenants } from './collections/Tenants.js'
import { Users } from './collections/Users.js'
import { Footer } from './globals/Footer.js'
import { Header } from './globals/Header.js'
import { seed } from './seed/index.js'
import { mobileBreakpoint, pagesSlug } from './shared.js'
import { formatLivePreviewURL } from './utilities/formatLivePreviewURL.js'

export default buildConfigWithDefaults({
  admin: {
    livePreview: {
      // You can define any of these properties on a per collection or global basis
      // The Live Preview config cascades from the top down, properties are inherited from here
      url: formatLivePreviewURL,
      breakpoints: [mobileBreakpoint],
      collections: [pagesSlug, postsSlug, ssrPostsSlug],
      globals: ['header', 'footer'],
    },
  },
  cors: ['http://localhost:3000', 'http://localhost:3001'],
  csrf: ['http://localhost:3000', 'http://localhost:3001'],
  collections: [Users, Pages, Posts, PostsSSR, Tenants, Categories, Media],
  globals: [Header, Footer],
  onInit: seed,
})
