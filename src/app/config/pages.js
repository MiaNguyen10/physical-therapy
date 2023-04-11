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
    exerciseDetailPath: '/exercise/:id/exerciseDetail',
    exerciseDetailAddPath: '/exercise/:id/addExerciseDetail',

    exerciseResourceListPath: '/exerciseResource',

    exerciseResourcePath: '/exercise/:id/exerciseDetail/:idDetail/exerciseResource',
    addExerciseResourcePath: '/exercise/:id/exerciseDetail/:idDetail/addExerciseResource',
    editExerciseResourcePath: '/exercise/:id/exerciseDetail/:idDetail/editExerciseResource',
    
    exerciseResourceEditPath: '/exerciseResource/:id/edit',
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