//===== EventRunnable ===== //
/*
Special function for running eventTypes without having the reuse
eventType every single time

eventType = EventType."eventName"
runnable = "() => {}" event input is "event"
fileName - for debugging errors
*/

function runEvent(eventType, runnable, fileName){
if (!eventType) return;

Events.on(eventType, event => {
try {

runnable(event);
  
} catch(e){
Vars.ui.showText(fileName, e);
}
});
  
}
