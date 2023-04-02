const accountData = [
    {
        id: 1,
        medicalRecordId: 1,
        roleId: 1,
        firstName: 'Ha',
        lastName: 'Nguyen',
        phone: '12392973392',
        DOB: 'July 1st 1999',
        gender: 'Female',
        email: 'hanguyen@gmail.com',
        password: 'ha123',
        banStatus: true
    },
    {
        id: 2,
        medicalRecordId: 2,
        roleId: 2,
        firstName: 'Linh',
        lastName: 'Le',
        phone: '12392973392',
        DOB: 'July 1st 1999',
        gender: 'Female',
        email: 'linhle@gmail.com',
        password: 'ha123',
        banStatus: false
    }
]

export default accountData

export const URole = ["All", "Admin", "Manager","Physiotherapist", "Member"]

export const UStatus = ["All", "Active", "Banded"]

export const UGender = ["Nam","Nữ"]
