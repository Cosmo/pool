//
//  ActivityDetailTableViewController.swift
//  
//
//  Created by Devran Uenal on 13.06.15.
//
//

import UIKit

class ActivityDetailTableViewController: UITableViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        self.title = "Details"
        
        self.tableView.registerClass(TransactionTableViewCell.self, forCellReuseIdentifier: transactionCell)
        
        self.navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Invite", style: UIBarButtonItemStyle.Plain, target: self, action: "invite:")
        
        if let id = self._id {
            Activity.detail(id)?.success({ (data, response) -> () in
                var stringData = NSString(data: data, encoding: NSUTF8StringEncoding)! as String
                self.data <-- stringData
                println(self.data)
                dispatch_async(dispatch_get_main_queue(), {
                    self.tableView.reloadData()
                })
            }).failure({ (data, response, error) -> () in
                println("failure")
            }).call()
        }
    }
    
    func invite(sender: AnyObject) {
        let viewController = UINavigationController(rootViewController: InviteTableViewController())
        self.presentViewController(viewController, animated: true, completion: nil)
    }

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 0
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 0
    }

    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        var cell: TransactionTableViewCell
        cell = tableView.dequeueReusableCellWithIdentifier(transactionCell, forIndexPath: indexPath) as! TransactionTableViewCell
        
        if
            let amountInCents = self.data?.transactions?[indexPath.row].amount,
            let currency = self.data?.transactions?[indexPath.row].currency
        {
            let amount = Double(amountInCents) / 100.0
            let numberFormatter             = NSNumberFormatter()
            numberFormatter.numberStyle     = NSNumberFormatterStyle.CurrencyStyle
            numberFormatter.currencyCode    = currency
            
            cell.amountLabel.text = numberFormatter.stringFromNumber(amount)
        }
        
        return cell
    }
}
