import { PriceType } from '@libs/entities/src'; // import typescript file not js

export const productStub = (id: string) => {
  return id == '1'
    ? {
        id: '1',
        name: 'IPhone X',
        brand: 'Apple',
        sku: ['1234', '1235'],
        description: 'Apple Iphone x, 64gb',
        specs: {
          display:
            'Super Retina HD, 5.8-inch (diagonal) all-screen OLED Multi-Touch display, HDR',
          resulation:
            '2436-by-1125-pixel resolution at 458 ppi, 1,000,000:1 contrast ratio (typical)',
          memory: '8gb',
          chipset:
            '64 bit mimariye sahip A11 Bionic çip,Nöral sistem,tümleşik M11 yardımcı hareket işlemcisi',
        },
        price: {
          type: PriceType.TRY,
          unit: 6.099,
          task: 10,
        },
        category: '1',
      }
    : {};
};
