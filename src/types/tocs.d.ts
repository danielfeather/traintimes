interface TocBody {
    TrainOperatingCompanyList: TrainOperatingCompanyList
}

interface TrainOperatingCompanyList {
    $: object
    TrainOperatingCompany: Array<TrainOperatingCompany>
}

interface TrainOperatingCompany {
    $: object
    AtocCode: Array<string>
    AtocMember: Array<boolean>
    StationOperator: boolean
    Name: Array<string>
    LegalName: Array<string>
    ManagingDirector: Array<string>
    Logo: Array<string>
    NetworkMap: Array<string>
    OperatingPeriod: Array<object>
    HeadOfficeContactDetails: Array<object>
    CompanyWebsite: Array<string>
    SupportAndInformation: Array<object>
    TicketingAndFares: Array<object>
}

export {
    TocBody,
    TrainOperatingCompanyList,
    TrainOperatingCompany
}