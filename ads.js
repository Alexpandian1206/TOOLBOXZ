
function showInterstitialAd(callback) {
  // Load the ad
  (function(d,z,s){
      s.src='https://'+d+'/401/'+z;
      try {
          (document.body || document.documentElement).appendChild(s);
      } catch(e){}
  })('groleegni.net',9724439,document.createElement('script'));

  // Immediately run the tool’s function after ad
  if (typeof callback === "function") {
    callback();
  }
}
