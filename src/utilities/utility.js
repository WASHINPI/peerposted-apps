export const priceDisplay = (price) => {
    return `BDT ${price}`;
};
export const originalPrice = (price, buyerCharge) => {
    console.log(price, buyerCharge);
   return Math.round(100 / (100 + Number(buyerCharge)) * Number(price)); 
};

export const travelerEarn = (price, travelCharge) => {
    return Math.round(price * Number(travelCharge) / 100);
};

export const baseUrl = 'https://peerposted.com/';
export const devBaseUrl = 'http://peer-ashique19.c9users.io/';

const USA = [{
    id: 228, 
    code: 'US', 
    name: 'United States', 
    lat: '37.09024', 
    lon: '-95.712891',
    phone_code: '+1',
    created_at: '-0001-11-30 00:00:00',
    updated_at: '2017-08-20 13:46:12'

}];
const BD = [{
    id: 17, 
    code: 'BD', 
    name: 'Bangladesh', 
    lat: '23.684994', 
    lon: '90.356331',
    phone_code: '+880',
    created_at: '-0001-11-30 00:00:00',
    updated_at: '2017-08-20 13:46:10'
}];
const USAAIRPORT = [
    { id: 2, name: '(OCA) - Ocean Reef Club Airport, Key Largo, United States' },
    { id: 3, name: '(PQS) - Pilot Station Airport, Pilot Station, United States' },
    { id: 4, name: '(CSE) - Buckhorn Ranch Airport, Crested Butte, United States' },
    { id: 5, name: '(JCY) - LBJ Ranch Airport, Johnson City, United States' },
    { id: 6, name: '(PMX) - Metropolitan Airport, Palmer, United States' },
    { id: 7, name: '(NUP) - Nunapitchuk Airport, Nunapitchuk, United States' },
    { id: 8, name: '(ICY) - Icy Bay Airport, Icy Bay, United States' },
    { id: 9, name: '(KKK) - Kalakaket Creek AS Airport, Kalakaket Creek, United States' },
    { id: 10, name: '(MHS) - Dunsmuir Muni-Mott Airport, Dunsmuir, United States' },
    { id: 11, name: '(LVD) - Lime Village Airport, Lime Village, United States' },
    { id: 12, name: '(HGZ) - Hog River Airport, Hogatza, United States' },
    { id: 13, name: '(OTN) - Ed-Air Airport, Oaktown, United States' },
    { id: 14, name: '(TLF) - Telida Airport, Telida, United States' },
    { id: 15, name: '(BZT) - Eagle Air Park, Brazoria, United States' },
    { id: 16, name: '(BYW) - Blakely Island Airport, Blakely Island, United States' },
    { id: 17, name: '(DRF) - Drift River Airport, Kenai, United States' },
    { id: 18, name: '(BDF) - Rinkenberger Restricted Landing Area, Bradford, United States' },
    { id: 19, name: '(VRS) - Roy Otten Memorial Airfield, Versailles, United States' },
    { id: 20, name: '(ATT) - Atmautluak Airport, Atmautluak, United States' },
    { id: 21, name: '(LIV) - Livengood Camp Airport, Livengood, United States' },
    { id: 22, name: '(PDB) - Pedro Bay Airport, Pedro Bay, United States' },
    { id: 23, name: '(KOZ) - Ouzinkie Airport, Ouzinkie, United States' },
    { id: 24, name: '(TNK) - Tununak Airport, Tununak, United States' },
    { id: 25, name: '(WKK) - Aleknagik / New Airport, Aleknagik, United States' },
    { id: 26, name: '(NNK) - Naknek Airport, Naknek, United States' },
    { id: 27, name: '(BCS) - Southern Seaplane Airport, Belle Chasse, United States' },
    { id: 28, name: '(BWL) - Earl Henry Airport, Blackwell, United States' },
    { id: 29, name: '(CWS) - Center Island Airport, Center Island, United States' },
    { id: 30, name: '(TEK) - Tatitlek Airport, Tatitlek, United States' },
    { id: 31, name: '(DUF) - Pine Island Airport, Corolla, United States' },
    { id: 32, name: '(SSW) - Stuart Island Airpark, Stuart Island, United States' },
    { id: 33, name: '(FOB) - Fort Bragg Airport, Fort Bragg, United States' },
    { id: 34, name: '(AXB) - Maxson Airfield, Alexandria Bay, United States' },
    { id: 35, name: '(REE) - Reese Airpark, Lubbock, United States' },
    { id: 36, name: '(WDN) - Waldronaire Airport, East Sound, United States' },
    { id: 37, name: '(CHU) - Chuathbaluk Airport, Chuathbaluk, United States' },
    { id: 38, name: '(UGS) - Ugashik Airport, Ugashik, United States' },
    { id: 39, name: '(KLL) - Levelock Airport, Levelock, United States' },
    { id: 40, name: '(WTL) - Tuntutuliak Airport, Tuntutuliak, United States' },
    { id: 41, name: '(TWA) - Twin Hills Airport, Twin Hills, United States' },
    { id: 42, name: '(KCQ) - Chignik Lake Airport, Chignik Lake, United States' },
    { id: 91, name: '(CEX) - Chena Hot Springs Airport, Chena Hot Springs, United States' },
    { id: 92, name: '(SOL) - Solomon State Field, Solomon, United States' },
    { id: 93, name: '(HED) - Herendeen Bay Airport, Herendeen Bay, United States' },
    { id: 94, name: '(TWE) - Taylor Airport, Taylor, United States' },
    { id: 95, name: '(LNI) - Lonely Air Station, Lonely, United States' },
    { id: 96, name: '(CDL) - Candle 2 Airport, Candle, United States' },
    { id: 97, name: '(BSZ) - Bartletts Airport, Egegik, United States' },
    { id: 98, name: '(BSW) - Boswell Bay Airport, Boswell Bay, United States' },
    { id: 100, name: '(TGE) - Sharpe Field, Tuskegee, United States' },
];

const BDAIRPORT = [
    { id: 7296, name: '(CGP) - Shah Amanat International Airport, Chittagong, Bangladesh' },
    { id: 7304, name: '(ZYL) - Osmany International Airport, Sylhet, Bangladesh' },
    { id: 7305, name: '(DAC) - Dhaka / Hazrat Shahjalal International Airport, Dhaka, Bangladesh' }
];

const paymentMethod = [
    { id: '', name: 'Select Method' },
    { id: 'bank', name: 'Bank Deposit (Any Bank in Bangladesh)' },
    { id: 'bkash', name: 'Bkash' },
    { id: 'cash', name: 'Cash' },
    { id: 'cheque', name: 'Cheque' }
];

export { BD, USA, USAAIRPORT, BDAIRPORT, paymentMethod };

