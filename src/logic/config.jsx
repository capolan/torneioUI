export function getURL() {

    let url = "https://aws.sensoronline.net/api";
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      url = "http://localhost:8010/proxy/api";
    } 
    return url;
};
