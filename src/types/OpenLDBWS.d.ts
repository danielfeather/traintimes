export interface GetStationBoardResult {
    generatedAt: string
    locationName: string
    crs: string
    platformAvailable: boolean
    trainServices: TrainServices
}

export interface GetServiceDetailsResult extends Service {
    generatedAt: string
    locationName: string
    crs: string
}

export interface TrainServices {
    service: Array<Service>
}

export interface Service {
    std: string
    etd: string
    platform: string
    operator: string
    operatorCode: string
    serviceType: string
    length: string
    serviceID: string
    origin: {
        location: Array<Location>
    }
    destination: {
        location: Array<Location>
    }
    previousCallingPoints?: {
        callingPointList: CallingPointList
    }
    subsequentCallingPoints?: {
        callingPointList: CallingPointList
    }
}

export interface Location {
    locationName: string
    crs: string
}

export interface CallingPointList {
    callingPoint: Array<CallingPoint>
}

export interface CallingPoint extends Location {
    st: string
    et: string
    length: string
}