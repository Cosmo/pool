//
//  ActivitiesTableViewController.swift
//  
//
//  Created by Devran Uenal on 13.06.15.
//
//

import UIKit

class ActivitiesTableViewController: UITableViewController {
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
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        let viewController = ActivityDetailTableViewController()
        self.navigationController?.pushViewController(viewController, animated: true)
    }
}
