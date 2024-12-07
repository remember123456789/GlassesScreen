import {onMounted, onUnmounted} from "vue";

export default function useScreenAdapt(dWidth = 1920, dHeight = 1080) {

    function AdaptScreen() {
        let w = dWidth;
        let h = dHeight
        let designRation = w / h;

        let dw = document.documentElement.clientWidth
        let dh = document.documentElement.clientHeight

        let deviceRation = dw / dh
        //计算缩放比
        let scaleRation = 1
        if (deviceRation > designRation) {
            scaleRation = dh / h
        } else {
            scaleRation = dw / w
        }
        return scaleRation
        // console.log(scaleRation, 'scaleRation')
        // document.body.style.transform = `scale(${scaleRation})`
    }

    return {
        AdaptScreen
    }
}


