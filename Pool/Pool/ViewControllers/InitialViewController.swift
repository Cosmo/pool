//
//  InitialViewController.swift
//  
//
//  Created by Thomas on 13/06/15.
//
//

import UIKit

class InitialViewController: UITableViewController {
    var data = [Activity]()
    let activityCell = "activityCell"

    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "Pool"
        
        self.tableView.registerClass(ActivityTableViewCell.self, forCellReuseIdentifier: activityCell)
        
        Activity.all()?.success({ (data, response) -> () in
            var stringData = NSString(data: data, encoding: NSUTF8StringEncoding)! as String
            self.data <-- stringData
            dispatch_async(dispatch_get_main_queue(), {
                self.tableView.reloadData()
            })
        }).failure({ (data, response, error) -> () in
            println("failure")
        }).call()
        
    }

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.data.count
    }

    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        
        var cell: ActivityTableViewCell
        cell = tableView.dequeueReusableCellWithIdentifier(activityCell, forIndexPath: indexPath) as! ActivityTableViewCell
        
        cell.textLabel?.text = self.data[indexPath.row].name

        return cell
    }

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
    
    func loginButtonAction(button: UIButton) {
        println("loginButtonAction:")
    }
}
