interface TocBody {
    TrainOperatingCompanyList: TrainOperatingCompanyList
}

interface TrainOperatingCompanyList {
    $: object
    TrainOperatingCompany: Array<TrainOperatingCompany>
}

interface TrainOperatingCompany {
    $: object
    AtocCode: string
    AtocMember: string
    StationOperator: boolean
    Name: string
    LegalName: string
    ManagingDirector: string
    Logo: string
    NetworkMap: string
    OperatingPeriod: Array<object>
    HeadOfficeContactDetails: Array<object>
    CompanyWebsite: string
    SupportAndInformation: Array<object>
    TicketingAndFares: Array<object>
}

export {
    TocBody,
    TrainOperatingCompanyList,
    TrainOperatingCompany
}