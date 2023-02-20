def generate_prompt_optimize(function):
    prompt = """Optimize the code by providing changes and lines of code.
Example: 
Code: def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "word",
        help="the word to be searched for in the text file."
    )
    parser.add_argument(
        "filename",
        help="the path to the text file to be searched through"
    )
Optimization:
Avoid using unnecessary variables: In this case, the "parser" variable can be removed and the arguments can be added directly to the ArgumentParser() method.
Use the nargs parameter to allow for multiple words to be searched for at once.
Use the type parameter to specify the type of the argument, which can improve performance.
Use the metavar parameter to provide a more descriptive name for the argument in the usage message.
Use the action parameter to specify a custom action for the argument, which can be used for advanced processing.

Example:
Code: def dynamic_k_matching(self, cost, pair_wise_ious, gt_classes, num_gt, fg_mask):
    # Dynamic K
    # ---------------------------------------------------------------
    matching_matrix = torch.zeros_like(cost, dtype=torch.uint8)

    ious_in_boxes_matrix = pair_wise_ious
    n_candidate_k = min(10, ious_in_boxes_matrix.size(1))
    topk_ious, _ = torch.topk(ious_in_boxes_matrix, n_candidate_k, dim=1)
    dynamic_ks = torch.clamp(topk_ious.sum(1).int(), min=1)
    dynamic_ks = dynamic_ks.tolist()
    for gt_idx in range(num_gt):
        _, pos_idx = torch.topk(
            cost[gt_idx], k=dynamic_ks[gt_idx], largest=False
        )
        matching_matrix[gt_idx][pos_idx] = 1

    del topk_ious, dynamic_ks, pos_idx

    anchor_matching_gt = matching_matrix.sum(0)
    if (anchor_matching_gt > 1).sum() > 0:
        _, cost_argmin = torch.min(cost[:, anchor_matching_gt > 1], dim=0)
        matching_matrix[:, anchor_matching_gt > 1] *= 0
        matching_matrix[cost_argmin, anchor_matching_gt > 1] = 1
    fg_mask_inboxes = matching_matrix.sum(0) > 0
    num_fg = fg_mask_inboxes.sum().item()

    fg_mask[fg_mask.clone()] = fg_mask_inboxes

    matched_gt_inds = matching_matrix[:, fg_mask_inboxes].argmax(0)
    gt_matched_classes = gt_classes[matched_gt_inds]

    pred_ious_this_matching = (matching_matrix * pair_wise_ious).sum(0)[
        fg_mask_inboxes
    ]
    return num_fg, gt_matched_classes, pred_ious_this_matching, 
Optimization:
Avoid using the del keyword to delete intermediate variables: In this case, topk_ious, dynamic_ks, and pos_idx can be removed directly after they are used.
Use in-place operations: In this case, operations like matching_matrix[gt_idx][pos_idx] = 1 and fg_mask[fg_mask.clone()] = fg_mask_inboxes can be replaced with their in-place version, matching_matrix[gt_idx][pos_idx].fill_(1) and fg_mask.copy_(fg_mask_inboxes) respectively.
Use broadcasting to optimize matrix operations: In this case, operations like matching_matrix * pair_wise_ious can be optimized by broadcasting the matching_matrix to match the shape of pair_wise_ious.

Generated prompt:
Optimization:
{}
Code: """ + function +"""
""".format(function.capitalize())
    return prompt
