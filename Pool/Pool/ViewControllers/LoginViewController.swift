//
//  LoginViewController.swift
//  
//
//  Created by Thomas on 13/06/15.
//
//

import UIKit

class LoginViewController: UIViewController, GiniVisionDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // gini
        
        
        // backgroundColor
        self.view.backgroundColor = UIColor.whiteColor()
        
        // navigationBar
        self.navigationController?.navigationBar.setBackgroundImage(UIImage(), forBarMetrics: .Default)
        self.navigationController?.navigationBar.shadowImage  = UIImage()
        self.navigationController?.navigationBar.translucent  = true
        self.navigationController?.navigationBar.barStyle     = UIBarStyle.Default
        
        // imageView: logo
        let imageView = UIImageView(
            image: UIImage(named: "pool-logo")
        )
        imageView.contentMode = UIViewContentMode.ScaleAspectFit
        imageView.setTranslatesAutoresizingMaskIntoConstraints(false)
        self.view.addSubview(imageView)
        
        self.view.addConstraints(
            NSLayoutConstraint.constraintsWithVisualFormat("H:|-(50)-[imageView]-(50)-|",
                options: NSLayoutFormatOptions.AlignAllTop,
                metrics: nil,
                views: ["imageView": imageView]
            )
        )
        
        // button: login
        var loginButton = UIButton()
        
        loginButton.setTranslatesAutoresizingMaskIntoConstraints(false)
        loginButton.setTitle("Login", forState: UIControlState.Normal)
        loginButton.backgroundColor = UIColor.blueColor()
        loginButton.addTarget(self, action: "loginButtonAction:", forControlEvents: UIControlEvents.TouchUpInside)
        
        self.view.addSubview(loginButton)
        
        self.view.addConstraints(
            NSLayoutConstraint.constraintsWithVisualFormat("H:|[loginButton]|",
                options: NSLayoutFormatOptions.AlignAllTop,
                metrics: nil,
                views: ["loginButton": loginButton]
            )
        )
        
        // constraints: vertical
        self.view.addConstraints(
            NSLayoutConstraint.constraintsWithVisualFormat("V:|[imageView]-(>=0)-[loginButton]|",
                options: NSLayoutFormatOptions(0),
                metrics: nil,
                views: ["imageView": imageView, "loginButton": loginButton]
            )
        )
    }
    
    func loginButtonAction(button: UIButton) {
        println("loginButtonAction:")
        GiniVision.captureImageWithViewController(self, delegate: self)
    }
    
    func didScan(document: UIImage!, documentType docType: GINIDocumentType, uploadDelegate delegate: GINIVisionUploadDelegate!) {
        println("didScan")
    }
    
    func didScanOriginal(image: UIImage!) {
        println("didScanOriginal")
    }
    
    func didFinishCapturing(success: Bool) {
        println("didFinishCapturing")
    }
}
