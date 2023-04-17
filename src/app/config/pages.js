const pages = {
    landingPage: '/',   
    loginPath: '/login',

    therapistListPath: '/account/therapist',
    therapistEditPath: '/account/therapist/:userId/edit',

    userListPath: '/user',
    userEditPath: '/user/:id/edit',
    addUserPath : '/user/add',

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
    scheduleBySlotID: '/slot/:id/schedule',
    
    slotListPath: '/slot',
    addSlotPath: '/slot/add',
    slotEditPath: '/slot/:id/edit',

    addPhysiotherapistPath: '/physiotherapist/add',
}

export default pages