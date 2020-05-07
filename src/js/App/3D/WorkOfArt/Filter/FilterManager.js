import UIManager from "../../../UI/UIManager";
import RaycasterManager from "../../../Interaction/RaycasterManager";
import InteractionManager from "../../../Interaction/InteractionManager";
import PostProcessingManager from "../../../PostProcessing/PostProcessingManager";


const FilterManager = {
    objects: [],
    currentObject: null,
    i: 0,
    isFiltered: false,
    phone: null,
    isSmall: true,
    pupleLight: null,

    //Init module
    init(phone, statue0, statue1, statue2, statue3) {
        this.phone = phone;
        this.objects.push(statue0, statue1, statue2, statue3);
        this.currentObject = statue0;
    },

    setLight(purpleLight) {
        this.pupleLight = purpleLight;
    },

    //Start module
    startModule() {
        this.clickOnFilter();
        UIManager.hidePrev();
        this.pupleLight.visible = true;
    },

    //Prepare module onClick
    clickOnFilter() {
        this.phone.setCameraScreenTexture();
        RaycasterManager.isActive = true;
        RaycasterManager.identifiers.push("toFilter");
        InteractionManager.clickListener = true;
    },

    //Handle filter clicks
    clickedFilter(name) {
        if (name === "prev") {
            this.setPrev();
        }
        if (name === "next") {
            this.setNext();
        }
        if (name === "exit") {
            this.stopPhoneFilter();
        }
        if (name === "toFilter") {
            RaycasterManager.identifiers.splice("toFilter");
            this.filterModule();
        }
    },

    //Start Phone filter
    filterModule() {
        if (!this.isFiltered) {
            this.startPhoneFilter(this.phone);
        }
    },

    //Start filter with phone
    startPhoneFilter(phone) {
        PostProcessingManager.setVignette(1.3);
        this.isFiltered = true;
        this.isSmall = false;
        phone.setFullscreen();
        phone.zoomPhone(100);
        document.getElementById("filter").style.display = "block"
    },

    //Stop filter with phone
    stopPhoneFilter() {
        PostProcessingManager.setVignette(0);
        if (!this.isSmall) {
            this.phone.setSmall();
            this.isSmall = true;
        }
        document.getElementById("filter").style.display = "none";
        this.startStory();
    },

    //Start carousel story
    startStory() {
        UIManager.newCarousel();
    },

    //Go to previous filter
    setPrev() {
        if (this.objects[this.i - 1]) {
            this.setCurrentDisable();
            this.currentObject = this.objects[this.i - 1];
            this.setCurrentActive();
            this.i -= 1;
        }
    },

    //Go to next filter
    setNext() {
        if (this.objects[this.i + 1]) {
            this.setCurrentDisable();
            this.currentObject = this.objects[this.i + 1];
            this.setCurrentActive();
            this.i += 1;
            if (this.i === this.objects.length - 1) {
                this.stopPhoneFilter()
            }
        }
    },

    //Show current object
    setCurrentActive() {
        this.currentObject.show();
    },

    //Disable current object
    setCurrentDisable() {
        this.currentObject.hide();
    },

    endModule() {
        this.isFiltered = false;
        this.resetModule();
    },

    resetModule() {
        this.stopPhoneFilter();
        UIManager.deleteCarousel();
        UIManager.displayNextPrev();
        this.resetFilter();
        this.pupleLight.visible = false;
    },

    //Reset filter
    resetFilter() {
        this.setCurrentDisable();
        this.i = 0;
        this.currentObject = this.objects[0];
        this.setCurrentActive()
    },
};

export default FilterManager;
