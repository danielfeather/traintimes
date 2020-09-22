import {createClientAsync} from 'soap'

/**
 * Provides methods to query information from Darwin through OpenLDBWS
 */
export default class OpenLDBWS {

    private soapClient: any = {}

    /**
     * Initialises the SOAP client within the class so we can call OpenLDBWS
     */
    async init(): Promise<void> {

        this.soapClient = await createClientAsync('https://lite.realtime.nationalrail.co.uk/OpenLDBWS/wsdl.aspx?ver=2017-10-01')

        this.soapClient.addSoapHeader(`<AccessToken><TokenValue>${process.env.OPEN_LDBWS_TOKEN}</TokenValue></AccessToken>`)

    }

    async getDepartureBoard(crsCode: string){

        try {
            return await this.soapClient.GetDepartureBoardAsync({
                crs: crsCode.toUpperCase()
            })
        } catch (e){
            return e
        }

    }

    getDepartureBoardWithDetails(crsCode: string){



    }

    getArrivalBoard(crsCode: string){



    }

    getArrivalBoardWithDetails(crsCode: string){



    }

    /**
     * Get the service details
     * @param {string} crsCode
     */
    getServiceDetails(crsCode: string){

    }

}