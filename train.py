# -*- coding:utf-8 -*-

from ultralytics import YOLO
import torch
torch.backends.cudnn.enabled = True
torch.backends.cudnn.benchmark = True
torch.backends.cudnn.deterministic = True

if __name__ == "__main__":
    # build from YAML and transfer weights
    model = YOLO('yolo11n.yaml').load('./weights/yolo11n.pt')
    # Train the model
    model.train(data='D:\Projects\FlightInspection-AIDetection\VOCData\mydata.yaml', epochs=100, imgsz=640, save=True, patience=20, optimizer='AdamW',)
