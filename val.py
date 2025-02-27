# -*- coding:utf-8 -*-
# @author: 牧锦程
# @微信公众号: AI算法与电子竞赛
# @Email: m21z50c71@163.com
# @VX：fylaicai

from ultralytics import YOLO
import torch
torch.backends.cudnn.enabled = True
torch.backends.cudnn.benchmark = True
torch.backends.cudnn.deterministic = True

if __name__ == "__main__":
    # build from YAML and transfer weights
    model = YOLO('runs/detect/train/weights/best.pt')
    # Train the model
    model.val(data='./VOCData/mydata.yaml', imgsz=640)

