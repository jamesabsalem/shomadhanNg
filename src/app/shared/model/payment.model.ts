interface Payment {
    status: string;
    failedreason: string;
    sessionkey: string;
    gw: Gw;
    redirectGatewayURL: string;
    directPaymentURLBank: string;
    directPaymentURLCard: string;
    directPaymentURL: string;
    redirectGatewayURLFailed: string;
    GatewayPageURL: string;
    storeBanner: string;
    storeLogo: string;
    desc: Desc[];
    is_direct_pay_enable: string;
}

interface Desc {
    name: string;
    type: string;
    logo: string;
    gw: string;
    r_flag?: string;
    redirectGatewayURL?: string;
}

interface Gw {
    visa: string;
    master: string;
    amex: string;
    othercards: string;
    internetbanking: string;
    mobilebanking: string;
}
