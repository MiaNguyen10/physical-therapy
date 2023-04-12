const pages = {
    landingPage: '/',   
    loginPath: '/login',
    accountPath: '/account',
    managerListPath: '/account/managerList',
    therapistListPath: '/account/therapistList',
    memberListPath: '/account/memberList',
    addAccountPath : '/account/add',
    accountEditPath: '/account/:id/edit',
    accountDetailPath: '/account/:id',

    categoryListPath: '/category',
    addCategoryPath: '/category/add',
    categoryEditPath: '/category/:id/edit',

    exerciseListPath: '/exercise',
    addExercisePath: '/exercise/add',
    exerciseEditPath: '/exercise/:id/edit',

    exerciseDetailListPath: '/exercise/:id/exerciseDetailList',
    exerciseDetailEditPath: '/exercise/:id/exerciseDetailList/:idDetail/edit',
    exerciseDetailAddPath: '/exercise/:id/exerciseDetailList/add',

    exerciseResourceListPath: '/exercise/:id/exerciseDetailList/:idDetail/exerciseResource',
    addExerciseResourcePath: '/exercise/:id/exerciseDetailList/:idDetail/exerciseResource/add',
    editExerciseResourcePath: '/exercise/:id/exerciseDetailList/:idDetail/exerciseResource/:idResource/edit',

    schedulePath: '/schedulePath',
    slotListPath: '/slot',
    addSlotPath: '/slot/add',
    slotEditPath: '/slot/:id/edit',
    userListPath: '/user',
    addUserPath: '/user/add',
    addPhysiotherapistPath: '/physiotherapist/add',
    userEditPath: '/user/:id/edit',
}

export default pages