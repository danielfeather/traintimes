import {createClientAsync} from 'soap'
import {GetStationBoardResult} from "../../types/OpenLDBWS";

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

    async getDepartureBoard(crsCode: string): Promise<GetStationBoardResult> {

        try {
            const rawResponse: Array<any> = await this.soapClient.GetDepartureBoardAsync({
                crs: crsCode.toUpperCase()
            })

            return rawResponse[0]['GetStationBoardResult']
        } catch (e){
            throw e
        }

    }

    async getDepBoardWithDetails(crsCode: string): Promise<GetStationBoardResult> {

        try {
            const rawResponse: Array<any> = await this.soapClient.GetDepBoardWithDetailsAsync({
                crs: crsCode.toUpperCase()
            })

            return rawResponse[0]['GetStationBoardResult']
        } catch (e){
            throw e
        }

    }

    getArrivalBoard(crsCode: string){



    }

    getArrivalBoardWithDetails(crsCode: string){



    }

    /**
     * Get the service details
     * @param {string} serviceID
     */
    async getServiceDetails(serviceID: string){

        try {

            const rawResponse: Array<any> = await this.soapClient.GetServiceDetailsAsync({
                serviceID
            })

            return rawResponse[0]

        } catch (e){

            throw e

        }

    }

}