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
        var button1 = UIButton()
        var button2 = UIButton()
        
        button1.setTitle("1", forState: UIControlState.Normal)
        button2.setTitle("2", forState: UIControlState.Normal)
        
        button1.frame = CGRect(x: 0, y: 100, width: 100, height: 100)
        button2.frame = CGRect(x: 0, y: 200, width: 100, height: 100)
        
        button1.backgroundColor = UIColor.blueColor()
        button2.backgroundColor = UIColor.yellowColor()
        
        button1.addTarget(self, action: "button1", forControlEvents: UIControlEvents.TouchUpInside)
        button2.addTarget(self, action: "button2", forControlEvents: UIControlEvents.TouchUpInside)
        
        self.view.addSubview(button1)
        self.view.addSubview(button2)
    }
    
    func button1() {
        var viewController1 = LoginViewController()
        self.navigationController?.pushViewController(viewController1, animated: true)
    }
    
    func button2() {
        var viewController2 = ActivitiesTableViewController()
        self.navigationController?.pushViewController(viewController2, animated: true)
    }
}