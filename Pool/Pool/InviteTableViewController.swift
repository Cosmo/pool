//
//  InviteTableViewController.swift
//  
//
//  Created by Devran Uenal on 13.06.15.
//
//

import UIKit

class InviteTableViewController: UITableViewController {
    var users: [User] = [
        User(data: ["name": "maccosmo"]),
        User(data: ["name": "donnieraycrisp"]),
        User(data: ["name": "thomaspockrandt"]),
        User(data: ["name": "olcaybuyan"]),
        User(data: ["name": "kaimys"])
    ]

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let textField = UITextField()
        textField.backgroundColor = UIColor.whiteColor()
        textField.frame = CGRect(x: 0, y: 0, width: 200, height: 30)
        
        self.navigationItem.titleView = textField
        
        self.navigationItem.rightBarButtonItem = UIBarButtonItem(barButtonSystemItem: UIBarButtonSystemItem.Done, target: self, action: "hide:")
    }
    
    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 0
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 0
    }
    
    func hide(sender: AnyObject) {
        self.dismissViewControllerAnimated(true, completion: nil)
    }
}
