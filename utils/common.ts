
export function viewsShorter(views:number) {
    console.log(views);
    switch (true) {
        case views >= 100000000:
            console.log("value", views, (views / 100000000));
            return (views / 100000000).toFixed(1) + "B";
        case views >= 1000000:
            console.log("value", views, (views / 1000000));
            console.log("value", views);
            return (views / 1000000).toFixed(1) + "M";
        case views >= 1000:
            console.log("value", views, (views / 1000));
            console.log("value", views);
            return (views / 1000).toFixed(0) + "K";
        case views <= 1000:
            console.log("value", views);
            return views;
        default:
            break;
    }
}



export const convertTime = (time:string) => {
        const videoTimming = time.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        console.log(videoTimming);
        if (videoTimming === null) {
            return "00:00";
        }
        const timmingArray = videoTimming.slice(1,4).map((item,index)=>{
             return item = item ? item.padStart(2,"0") : "00";
        });
     
        console.log("timmingArray", timmingArray);
        
        return timmingArray.join(":");
     
 }


