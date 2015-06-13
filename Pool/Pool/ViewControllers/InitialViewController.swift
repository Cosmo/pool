//
//  InitialViewController.swift
//  
//
//  Created by Thomas on 13/06/15.
//
//

import UIKit

class InitialViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
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
        
        self.view.addConstraints(
            NSLayoutConstraint.constraintsWithVisualFormat("V:|[imageView]",
                options: NSLayoutFormatOptions.AlignAllLeft,
                metrics: nil,
                views: ["imageView": imageView]
            )
        )
    }
}
