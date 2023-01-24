def generate_prompt_explain(function):
    prompt = """Describe the code.
Example:
Code: def test_function(p1, p2, p3):
Description:
Use def test_function(p1, p2, p3) to do something.

Example:
Code language: Python
Code: def add_numbers(num1, num2):
    sum = num1 + num2
    print('Sum: ',sum)
Description:
Use add_numbers(num1, num2) to add two numbers.   
1. Add num1 and num2.
2. Print the sum.

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
Description:
Use main() to parse arguments via the parser variable. These
arguments will be defined by the user on the console.  This will pass
the word argument the user wants to parse along with the filename the
user wants to use, and also provide help text if the user does not
correctly pass the arguments.
1. Create an ArgumentParser object.
2. Add the word argument.
3. Add the filename argument.

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
Description:
Use dynamic_k_matching(self, cost, pair_wise_ious, gt_classes, num_gt, fg_mask) to perform dynamic K matching.
1. Create a matching matrix.
2. Get the top K IoUs.
3. Perform dynamic K matching.

Example:
Code language: Python
Code: 
class Vehicle(object):

    def __init__(self, arg, *args, **kwargs):
        self.arg = arg
Description:
The Vehicle object contains lots of vehicles
1. Create a Vehicle object.
2. Add the arg argument.
3. Add the args and kwargs arguments.

Generated prompt:
Description:: 
{}
Code: """ + function +"""
""".format(function.capitalize())
    return prompt
