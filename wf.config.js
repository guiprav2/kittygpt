let ui = JSON.parse((await (await fetch(`${rootPrefix}/wf.uiconfig.json`)).text()));
export default ui;
