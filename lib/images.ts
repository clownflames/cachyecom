/**
 * Central image catalogue for the Flipkart-inspired storefront UI.
 * All banner / category / promo artwork lives here — no image URLs are
 * scattered inside components.
 */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const imageSources = {
  hero: {
    saleBlue: u("1607082349566-187342175e2f", 1920),
    fashion: u("1483985988355-763728e1935b", 1920),
    electronics: u("1498049794561-7780e7231661", 1920),
    grocery: u("1542838132-92c53300491e", 1920),
    mobile: u("1511707171634-5f897ff02aa9", 1920),
  },
  promo: {
    trendingProducts: u("1441986300917-64674bd600d8", 1200),
    gadgets: u("1523275335684-37898b6baf30", 1200),
    style: u("1542291026-7eec264c27ff", 1200),
    homeDecor: u("1586023492125-27b2c045efd7", 1200),
  },
  categories: {
    foryou: u("1511707171634-5f897ff02aa9", 400),
    fashion: u("1483985988355-763728e1935b", 400),
    mobiles: u("1511707171634-5f897ff02aa9", 400),
    electronics: u("1498049794561-7780e7231661", 400),
    beauty: u("1596462502278-27bfdc403348", 400),
    home: u("1586023492125-27b2c045efd7", 400),
    appliances: u("1556911220-bff31c812dba", 400),
    toys: u("1487222477894-8943e31ef7b2", 400),
    foodHealth: u("1512621776951-a57141f2eefd", 400),
    auto: u("1558981403-c5f9899a28bc", 400),
    sports: u("1546182990-dffeafbe841d", 400),
    furniture: u("1555041469-a586c61ea9bc", 400),
    books: u("1512820790803-83ca734da794", 400),
    twoWheelers: u("1485965120184-e220f721d03e", 400),
  },
  products: {
    phone: u("1511707171634-5f897ff02aa9", 600),
    phone2: u("1510557880182-3d4d3cba35a5", 600),
    headphones: u("1505740420928-5e560c06d30e", 600),
    headphoneBlack: u("1583394838336-acd977736f90", 600),
    earbuds: u("1590658268037-6bf12165a8df", 600),
    smartwatch: u("1523275335684-37898b6baf30", 600),
    watch: u("1524592094714-0f0654e20314", 600),
    powerbank: u("1583863788434-e58a36330cf0", 600),
    speaker: u("1505740420928-5e560c06d30e", 600),
    camera: u("1526170375885-4d8ecf77b99f", 600),
    laptop: u("1498050108023-c5249f4df085", 600),
    tv: u("1593359677879-a4bb92f829d1", 600),
    printer: u("1601524907652-b6471b03b0f8", 600),
    shoes: u("1542291026-7eec264c27ff", 600),
    tshirt: u("1521572163474-6864f9cf17ab", 600),
    jeans: u("1542272604-787c3835535d", 600),
    sunglasses: u("1572635196237-14b3f281503f", 600),
    perfume: u("1523293182086-7651a899d37f", 600),
    makeup: u("1522335789203-aabd1fc54bc9", 600),
    skincare: u("1556228720-195a672e8a03", 600),
    sofa: u("1555041469-a586c61ea9bc", 600),
    bedroom: u("1522708323590-d24dbb6b0267", 600),
    books: u("1512820790803-83ca734da794", 600),
    groceries: u("1542838132-92c53300491e", 600),
    dumbbells: u("1546182990-dffeafbe841d", 600),
    bicycle: u("1485965120184-e220f721d03e", 600),
    backpack: u("1553062407-98eeb64c6a62", 600),
    toys: u("1558060370-d644479cb6f7", 600),
    jacket: u("1551028719-00167b16eac5", 600),
  },
} as const;

function unsplash(id: string, w = 800): string {
  return u(id, w);
}

export type { };
export { unsplash };