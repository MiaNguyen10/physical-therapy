const pages = {
    landingPage: '/',   
    loginPath: '/login',

    userListPath: '/user',
    userEditPath: '/user/:id/edit',
    addUserPath : '/user/add',

    physioPath: '/user/:id/physiotherapist',
    addPhysioPath: '/user/:id/physiotherapist/add',

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
    scheduleBySlotID: '/slot/:id/schedule',

    typeOfSlotListPath: '/typeOfSlot',
    addtypeOfSlotPath: '/typeOfSlot/add',
    typeOfSlotEditPath: '/typeOfSlot/:id/edit',

    feedbackListPath: '/feedback',
}

export default pages