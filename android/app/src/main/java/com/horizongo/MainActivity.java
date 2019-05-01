package com.horizongo;

import com.facebook.react.ReactActivity;
//import android.Manifest;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "HorizonGO";
    }
/*
   @Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
 //  setContentView(R.layout.activity_main);

   // setContentView(R.layout.activity_loading);

    //trigger 'loadIMEI'
    loadIMEI();
    
    //overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);
}

public void loadIMEI() {

    int permissionCheck = ContextCompat.checkSelfPermission(thisActivity,
    Manifest.permission.ACCESS_FINE_LOCATION);
if(permissionCheck != PackageManager.PERMISSION_GRANTED) {
    // ask permissions here using below code
    ActivityCompat.requestPermissions(thisActivity,
            new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
            101);

}
    
}*/

}