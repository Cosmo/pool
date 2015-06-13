//
//  TransactionTableViewCell.swift
//  
//
//  Created by Devran Uenal on 13.06.15.
//
//

import UIKit

class TransactionTableViewCell: UITableViewCell {
    var amountLabel: UILabel
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }
    
    override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
        self.amountLabel = UILabel()
        
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        self.contentView.addSubview(self.amountLabel)
    }
    
    required init(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        self.amountLabel.frame = CGRect(x: 0, y: 0, width: self.frame.size.width, height: self.frame.size.height)
    }
}
